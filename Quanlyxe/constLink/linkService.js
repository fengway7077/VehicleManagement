
const linkService = 'http://192.168.11.129:3333/'
//const linkService = 'http://116.193.47.28:8099/'

export const vehicleService = linkService + 'image/vehicle/'
export const customerService = linkService + 'image/customer/'
//GetData
export const LinkListCustomer = linkService + 'customer/getcustomer'
export const LinkListVehicle = linkService + 'vehicledetails/getVehicle'
export const LinkVehicleFees = linkService + 'vehiclerentalhistory/getListVehiclerental'
export const LinkVehicleStatus = linkService + 'vehiclerentalhistory/getListVehiclerental'
//export const LinkVehicleList = linkService + 'Vehiclerepairhistory/getListVehiclerepair'
export const LinkVehicleInfo = linkService + 'vehicledetails/getVehicleInfo'
//Search
export const LinkSearchListCustomer = linkService + 'customer/searchCustomer'
export const LinkSearchListVehicle = linkService + 'vehicledetails/searchVehicle'
export const LinkSearchVehicleFees = linkService + 'vehiclerentalhistory/searchListVehiclerental'
export const LinkSearchVehicleStatus = linkService + 'vehiclerepairhistory/searchListVehiclestatus'
//Insert
export const LinkInsertCustomer = linkService + 'customer/createCustomer'
export const LinkInsertVehicle = linkService + 'vehicledetails/createVehicle'
export const LinkInsertRentalHistory = linkService + 'vehiclerentalhistory/addVehiclerental'
export const LinkInsertRepairHistory = linkService + 'vehiclerepairhistory/addVehiclerepair'
//Update
export const LinkUpdateCustomer = linkService + 'customer/editCustomer'
export const LinkUpdateVehicle = linkService + 'vehicledetails/editVehicle'
export const LinkUpdateRentalHistory = linkService + 'vehiclerentalhistory/editVehiclerental'
export const LinkUpdateRepairHistory = linkService + 'vehiclerepairhistory/editVehiclerepair'

//Delete
export const LinkDeleteCustomer = linkService + 'customer/removeCustomer'
export const LinkDeleteVehicle = linkService + 'vehicledetails/removeVehicle'
export const LinkDeleteRepairHistory = linkService + 'vehiclerepairhistory/removeVehiclerepair'
export const LinkDeleteRentalHistory = linkService + 'vehiclerentalhistory/removeVehiclerental'

//CheckData
export const LinkCheckDataCustomer = linkService + 'customer/checkCustomer'
export const LinkCheckDataVehicle = linkService + 'vehicledetails/checkVehicle'
export const LinkCheckVehicleRental = linkService + 'vehiclerentalhistory/checkVehiclerental'

//upload image
export const LinkUploadImage = linkService + 'vehicledetails/upload'
export const LinkUser = linkService + 'users/getUser'