import { AppState } from "../AppState.js"
import { Car } from "../models/Car.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class CarsService {
  async destroyCar(carId) {
    const response = await api.delete(`api/cars/${carId}`)
    logger.log('DESTROYED CAR 💥', response.data)
    const carIndex = AppState.cars.findIndex(car => car.id == carId)
    if (carIndex == -1) throw new Error("You messed up on findIndex, big fella")
    AppState.cars.splice(carIndex, 1)
  }
  async createCar(editableCarData) {
    const response = await api.post('api/cars', editableCarData)
    logger.log('CREATED CAR ✨🚗', response.data)
    const newCar = new Car(response.data)
    AppState.cars.push(newCar)
  }
  async getCars() {
    const response = await api.get('api/cars')
    logger.log('GOT CARS 🚓🚗🚙🏎️', response.data)
    const cars = response.data.map(carPOJO => new Car(carPOJO))
    AppState.cars = cars
  }
}

export const carsService = new CarsService()