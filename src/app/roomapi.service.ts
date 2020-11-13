import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable  } from 'rxjs';
import { RoomComponent } from './room/room.component';
@Injectable({
  providedIn: 'root'
})
export class RoomapiService {

  baseurl = "http://127.0.0.1:8000";
  httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }

  getAllRooms(): Observable<any>{
  return this.http.get(this.baseurl + '/rooms/',
  {headers: this.httpHeaders});
  }
  getOneRoom(roomCode): Observable<any> {
    return this.http.get(this.baseurl + '/rooms/' + roomCode + '/',
    {headers: this.httpHeaders});
  }
  updateRoom(room): Observable<any> {
    const body = {roomCode: room.roomCode, rom_capacity: room.rom_capacity,
    rom_floor: room.rom_floor, rom_type: room.rom_type};
    return this.http.put(this.baseurl + '/rooms/' + room.roomCode + '/', body,
    {headers: this.httpHeaders});
  }
  createRoom(room): Observable<any> {
    const body = {roomCode: room.roomCode, rom_capacity: room.rom_capacity,
    rom_floor: room.rom_floor, rom_type: room.rom_type};
    return this.http.post(this.baseurl + '/rooms/', body,
    {headers: this.httpHeaders});
  }
  deleteRoom(roomCode): Observable<any> {
    return this.http.delete(this.baseurl + '/rooms/' + roomCode + '/',
    {headers: this.httpHeaders});
  }
  }
