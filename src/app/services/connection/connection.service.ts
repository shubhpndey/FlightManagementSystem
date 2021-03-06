import { Injectable } from '@angular/core';
import { Airport } from 'src/app/classes/Airport/airport';
import { ScheduledFlight } from 'src/app/classes/ScheduledFlight/scheduled-flight';
import { Booking } from 'src/app/classes/Booking/booking';
import { User } from 'src/app/classes/User/user';
import { HttpClient } from '@angular/common/http';
import { Observable, ObservableLike } from 'rxjs';
import { Flight } from 'src/app/classes/Flight/flight';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  constructor(private http: HttpClient) { }

  public testAirport1: Airport = new Airport("TEST_AIRPORT_01","TEST_LOCATION_01","ATC01");
  public testAirport2: Airport = new Airport("TEST_AIRPORT_02","TEST_LOCATION_02","ATC02");
  // public testSchedule: Schdeule = new Schdeule(this.testAirport1,this.testAirport2, new Date(2020, 5, 23, 12, 12, 0, 0), new Date(2020, 5, 23, 2, 12, 0, 0))
  public testFlight: Flight = new Flight(4402,"AIR ASIA","AIRBUS 720",110);
  public testScheduledFlight: ScheduledFlight = new ScheduledFlight(111,this.testFlight,7000,110,[],this.testAirport1,this.testAirport2,new Date(2020, 5, 23, 12, 12, 0, 0), new Date(2020, 5, 23, 2, 12, 0, 0))
  // public flightList: Array<ScheduledFlight> = [this.testScheduledFlight]
  public testBooking: Booking
  public testBookingList: Array<Booking> = []
  public testUser: User = new User(120,"Yagyesh","123","7976649278","yagyesh03@gmail.com",this.testBookingList)
  public testUserList: Array<User> = [this.testUser]

  // getScheduledFlight(source: String, dest: String, depTime: Date){

  //   console.log("Schedduling FLight For" + source +" "+ dest + - +depTime);

  // }

  baseUrl: string = "http://localhost:7001/customer/"
  // Add User to Database
  postUser(user:User): Observable<User>{
    return this.http.post<User>(this.baseUrl,user);
  }

  // Get User By ID
  getUserByEmail(email: String): Observable<User>{
      return this.http.get<User>(this.baseUrl+email);
    }

  // Get Flight By Schedule
  getScheduledFlight(source: any, dest: any, depTime: Date): Observable<Array<ScheduledFlight>>{
    // console.log(source, dest , depTime)
    return  this.http.get<Array<ScheduledFlight>>(this.baseUrl+"searchFlight/"+source+"/"+dest+"/"+depTime)  
  }

  updateBookingList(booking: Booking,userId: String): Observable<Array<Booking>> {
    // console.log(booking)
    return this.http.post<Array<Booking>>(this.baseUrl+"changeBookingList/"+userId, booking)
  }

  getBookingList(userId: String): Observable<Array<Booking>>{
    // this.http.get<Array<Booking>>(this.baseUrl+"getBookingList/"+userId).subscribe(i => console.log(i))
    return this.http.get<Array<Booking>>(this.baseUrl+"getBookingList/"+userId);
  }
  
  getAirport_List(): Observable<Array<Airport>>{
    return this.http.get<Array<Airport>>(this.baseUrl+"getAirportList/");
  }

  deleteBooking(id: Number){
    // console.log(this.baseUrl+"deleteById/"+id)
    this.http.delete(this.baseUrl+"deleteById/"+id).subscribe(i =>i)
  }


  //-------------------------
  //ADMIN
  //-------------------------
  
  
  // postAirport(airport: Airport): Observable<Airport>{
    // return this.http.post<Airport>(this.baseUrl,airport);
    // console.log(airport)
    // return null;
  // }

  airportList: Array<Airport> = []
  postAirport(airport: Airport){
    this.airportList.push(airport)
    return  this.airportList
  }

  flightList: Array<Flight> = []
  postFlight(flight: Flight){
    this.flightList.push(flight)
    // console.log(this.flightList.length)
    return this.flightList
  }

  getFlight(id: String): Flight{
    return this.testFlight;
    // return this.http.get<Flight>(this.baseUrl+"getFlight/"+id)
  }

  getAirport(code: String): Airport{
    return this.testAirport1;
  }

  postScFlight(flight: ScheduledFlight): ScheduledFlight{
    console.log(flight)
    return null;
    // return this.http.get<Flight>(this.baseUrl+"getFlight/"+id)
  }

}