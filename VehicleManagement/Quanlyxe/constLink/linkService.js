const linkService = 'http://192.168.11.128:3333/'
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



