import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface CountResponse {
  count: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  count: number | '' = '';

  constructor(
    private http: HttpClient) {

  }

  ngOnInit(): void {
    this.http.get('/api/count')
      .subscribe((result: CountResponse) => {
        this.count = result.count;
      });
  }

  increment(): void {
    this.http.post('/api/increment', {})
      .subscribe((result: CountResponse) => {
        this.count = result.count;
      });
  }
}
