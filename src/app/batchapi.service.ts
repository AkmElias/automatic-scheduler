import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
@Injectable({
  providedIn: "root",
})
export class BatchapiService {
  baseurl = "http://127.0.0.1:8000";
  httpHeaders = new HttpHeaders({ "Content-Type": "application/json" });

  constructor(private http: HttpClient) {}

  getAllBatches(): Observable<any> {
    return this.http.get(this.baseurl + "/batches/", {
      headers: this.httpHeaders,
    });
  }
  getAllBatch(programCode): Observable<any> {
    return this.http.get(this.baseurl + "/batches/" + "/programCode", {
      headers: this.httpHeaders,
    });
  }

  getBatchesByProgram(programCode): Observable<any> {
    return this.http.get(this.baseurl + "/batches/" + programCode + "/", {
      headers: this.httpHeaders,
    });
  }

  getBatchByID(id): Observable<any> {
    return this.http.get(this.baseurl + "/batches/" + id + "/", {
      headers: this.httpHeaders,
    });
  }
  getOneBatch(id): Observable<any> {
    return this.http.get(this.baseurl + "/batches/" + id + "/", {
      headers: this.httpHeaders,
    });
  }
  updateBatch(batch): Observable<any> {
    const body = {
      batchName: batch.batchName,
      programCode: batch.programCode,
      bat_term: batch.bat_term,
      bat_year: batch.bat_year,
    };
    return this.http.put(this.baseurl + "/batches/" + batch.id + "/", body, {
      headers: this.httpHeaders,
    });
  }
  createBatch(batch): Observable<any> {
    const body = {
      batchName: batch.batchName,
      programCode: batch.programCode,
      bat_term: batch.bat_term,
      bat_year: batch.bat_year,
    };
    return this.http.post(this.baseurl + "/batches/", body, {
      headers: this.httpHeaders,
    });
  }
  deleteBatch(id): Observable<any> {
    return this.http.delete(this.baseurl + "/batches/" + id + "/", {
      headers: this.httpHeaders,
    });
  }

  getAllPrograms(): Observable<any> {
    return this.http.get(this.baseurl + "/programs/", {
      headers: this.httpHeaders,
    });
  }
  getOneProgram(programCode): Observable<any> {
    return this.http.get(this.baseurl + "/programs/" + programCode + "/", {
      headers: this.httpHeaders,
    });
  }
}
