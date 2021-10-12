// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0;

import "./utils/safemath.sol";

/// @title A contract for appartnent renting
/// @author Milos Dograjic
/// @notice For now this contract simulates the bidding and renting, payment needs to be implemented
contract ApartmentFactory {
    
    using SafeMath for uint256;
    
    struct Apartment{
        uint id;
        string street;
        uint16 streetNumber;
        uint16 ApartmentNumber;
        address owner;
    }

    struct RenterBidding{
        address renter;
        uint16 bidAmount;
    }

    struct Renter{
        address renter;
        bool renting;
    }
    
    Apartment[] public apartments;
    
    RenterBidding[] public resetRenterBidding;

    
    
    mapping (uint => address) apartmentToOwner;
    mapping (address => uint) ownerApartmentCount;
    mapping (uint => Renter) apartmentToRenter;
    mapping (address => uint) renterApartmentCount;
    mapping (uint => bool) apartmentAvailable;
    mapping (uint => RenterBidding) highestBidder;
   // mapping (uint => address[]) rentingHistory; 
  //  mapping (uint => uint) biddingHistory;


    modifier isApartmentOwner(uint _apartmentId){
        require(apartmentToOwner[_apartmentId] == msg.sender);
        _;
    }

    /// @notice This function creates a new apartment that will be available for rent
    /// @param _street street name
    /// @param _streetNumber street number
    /// @param _apartmentNumber apartment number
    /// @dev For now no further dev needed
    function createApartment(string memory _street, uint16 _streetNumber, uint16 _apartmentNumber) external{
        uint id = apartments.length;
        apartments.push(Apartment(id, _street, _streetNumber, _apartmentNumber, msg.sender));
        apartmentToOwner[id] = msg.sender;
        apartmentAvailable[id] = true;
        ownerApartmentCount[msg.sender] = ownerApartmentCount[msg.sender].add(1); 
    }
    
    /// @notice This function returns the list of all apartments in the contract
    /// @return apartments which is the list of all apartments in the contract
    /// @dev For now no further dev needed
    function getAllApartments() public view returns(Apartment[] memory){
        return apartments;
    } 

    /// @notice This function returns all apartments that are available for renting
    /// @return availableapartments - list of all apartments available for rent
    /// @dev For now no further dev needed
    function getAvailableApartments() public view returns(Apartment[] memory){
        Apartment[] memory available = new Apartment[](apartments.length);
        uint counter = 0;
        for(uint i = 0; i < apartments.length; i = i.add(1)){
            if(apartmentAvailable[i] == true){
                available[counter] = apartments[i];
                counter = counter.add(1);
            }
        }
        return available;
    }
    
    /// @notice This function returns the list of all apartments that are owned by the same person
    /// @param _owner Address of the owner of the apartments
    /// @return result - list of all apartments owned by the same person
    /// @dev For now no further dev needed
    function getApartmentsByOwner(address _owner) public view returns(uint[] memory) {
        uint[] memory result = new uint[](ownerApartmentCount[_owner]);
        uint counter = 0;
        for (uint i = 0; i < apartments.length; i = i.add(1)) {
            if (apartmentToOwner [i] == _owner) {
                result[counter] = i;
                counter = counter.add(1);
            }
        }
        return result;
    }
    
    /// @notice This function returns the list of all apartments that are rented by the same person
    /// @param _renter Address of the renter of the apartments
    /// @return result - list of all apartments rented by the same person
    /// @dev For now no further dev needed
    function getApartmentsByRenter(address _renter) public view returns(uint[] memory) {
        uint[] memory result = new uint[](renterApartmentCount[_renter]);
        uint counter = 0;
        for (uint i = 0; i < apartments.length; i = i.add(1)) {
            if (apartmentToRenter[i].renter == _renter && apartmentToRenter[i].renting == true) {
                result[counter] = i;
                counter = counter.add(1);
            }
        }
        return result;
    }

    /// @notice This function returns all the renters that are renting apartments from the same person 
    /// @param _owner ID of the Apartment
    /// @dev For now no further dev needed
    function getCurrentRentersForOwner(address _owner) view public returns(address[] memory){
        uint[] memory ownersApartments = getApartmentsByOwner(_owner);
        address[] memory currentRenters = new address[](ownerApartmentCount[_owner]);
        uint counter = 0;
        for(uint i = 0; i < ownersApartments.length; i = i.add(1)){
            if(apartmentToRenter[ownersApartments[i]].renting == true){
                currentRenters[counter] = apartmentToRenter[ownersApartments[i]].renter;
                counter = counter.add(1);
            }
        }
        return currentRenters;
    }

    /// @notice This function returns the bidding history for one Apartment
    /// @param _apartmentId ID of the Apartment
    /// @return RenterBiding[] - list of all renters and bidding amounts for the Apartment
    /// @dev For now no further dev needed
    function getHighestBidder(uint _apartmentId) view public returns(RenterBidding memory){
        return highestBidder[_apartmentId];
    }

    /// @notice This function returns the renting history for one Apartment
    /// @param _apartmentId ID of the Apartment
    /// @return address[] - list of all renters that were renting the Apartment
    /// @dev For now no further dev needed
    function getRentingHistory(uint _apartmentId) view public returns(address[] memory){
        //return rentingHistory[_apartmentId];
    }

    /// @notice This function allows potential renters to bid for the Apartment
    /// @param _apartmentId ID of the Apartment for bidding
    /// @param _bidAmount Bidding amount
    /// @dev Think about addapting for bidding history list
    function bid(uint _apartmentId, uint16 _bidAmount) public{
        require(apartmentAvailable[_apartmentId] == true);
        if(highestBidder[_apartmentId].bidAmount < _bidAmount){
            highestBidder[_apartmentId] = RenterBidding(msg.sender, _bidAmount);
        }
    }

    /// @notice This function cancels the potential renter's bid for the Apartment 
    /// @param _apartmentId ID of the Apartment for bidding
    /// @dev Think about addapting for bidding history list
    function cancelBidding(uint _apartmentId) isApartmentOwner(_apartmentId) public{
        // RenterBidding[] memory rbList = getBiddingHistory(_ApartmentId);
        // for(uint i = 0; i < rbList.length; i = i.add(1)){
        //     if(rbList[i].renter == msg.sender)
                 highestBidder[_apartmentId].renter = 0x0000000000000000000000000000000000000000;
                 highestBidder[_apartmentId].bidAmount = 0;
        // }
    }

    /// @notice This function closes the bidding period and rents the Apartment to the highest bidder
    /// @param _apartmentId ID of the Apartment for bidding
    /// @dev For now no further dev needed, think about impoving the mappings
    function closeBidding(uint _apartmentId) isApartmentOwner(_apartmentId) external{
        require(apartmentToOwner[_apartmentId] == msg.sender);
        RenterBidding memory rentCandidate = getHighestBidder(_apartmentId);
        if(rentCandidate.bidAmount > 0){
            rentApartment(rentCandidate.renter, _apartmentId);
        }
    }

    /// @notice This function cancels the potential renter's bid for the Apartment 
    /// @param _apartmentId ID of the Apartment for bidding
    /// @dev For now no further dev needed, think about impoving the mappings
    function rentApartment(address _renter, uint _apartmentId) internal{
        require(apartmentAvailable[_apartmentId] == true);
        apartmentToRenter[_apartmentId].renter = _renter;
        apartmentToRenter[_apartmentId].renting = true;
        renterApartmentCount[_renter] = renterApartmentCount[_renter].add(1);
        apartmentAvailable[_apartmentId] = false;
        cancelBidding(_apartmentId);
        // uint index = rentingHistory[_ApartmentId].length;
        // rentingHistory[_ApartmentId][index] = _renter;
    }
    
    /// @notice This function cancels the renting of the Apartment 
    /// @param _apartmentId ID of the Apartment
    /// @dev For now no further dev needed, think about impoving the mappings
    function stopRentingApartment(uint _apartmentId) external{
        require(apartmentToRenter[_apartmentId].renter == msg.sender && apartmentToRenter[_apartmentId].renting == true); 
        apartmentToRenter[_apartmentId].renting = false;
        renterApartmentCount[msg.sender] = renterApartmentCount[msg.sender].sub(1);
        apartmentAvailable[_apartmentId] = true;
        //apartmentBidding[_apartmentId] = resetRenterBidding;
    }

    /// @notice This function transfers Ether from renter to owner of the Apartment
    /// @param _renter Renter's address from which Ether will be transfered
    /// @param _owner Owner's address to which Ether will be transfered
    /// @param _apartmentId ID of the apartment for which the rent is being payed
    /// @param _rentAmount Amount of Ether that needs to be transfered
    /// @dev Function must be implemented. Check if all the input parameters are needed
    function payRent(address _renter, address _owner, uint _apartmentId, uint _rentAmount) public payable{
        
    }
    
}