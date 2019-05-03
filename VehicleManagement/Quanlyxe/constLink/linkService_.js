const linkService = 'http://192.168.11.129:3333/'
export const LinkListCustomer = linkService + 'customer/getcustomer'
export const LinkSearchListCustomer = linkService + 'customer/getcustomer'
export const LinkListVehicle = linkService + 'vehicledetails/getVehicle'
export const LinkSearchListVehicle = linkService + 'vehicledetails/searchVehicle'

export const LinkVehicleFees = linkService + 'vehiclerentalhistory/getListVehiclerental'
export const LinkSearchVehicleFees = linkService + 'vehiclerentalhistory/searchListVehiclerental'
export const LinkVehicleStatus = linkService + 'vehiclerentalhistory/getListVehiclerental'
export const LinkSearchVehicleStatus = linkService + 'Vehiclerepairhistory/searchListVehiclestatus'

//Add customer
export const LinkInsertCustomer = linkService + 'customer/createCustomer'
//Edit customer
export const LinkUpdateCustomer = linkService + 'customer/editCustomer'

//Remove customer
export const LinkRemoveCustomer = linkService + 'customer/removeCustomer'

//Add Vehicle
export const LinkInsertVehicle = linkService + 'vehicledetails/createVehicle'
//Edit Vehicle
export const LinkUpdateVehicle = linkService + 'vehicledetails/editVehicle'

// Add Vehicle rental history
export const LinkInsertVehiclerental = linkService + 'vehiclerentalhistory/addVehiclerental'

//Check vehicle
export const LinkCheckDataVehicle = linkService + 'vehicledetails/checkVehicle'

// Check vehicle
export const LinkCheckDataCustomer = linkService + 'customer/checkCustomer'

