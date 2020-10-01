import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/services/configs.service';

@Component({
  selector: 'app-graphics',
  templateUrl: './graphics.component.html',
  styleUrls: ['./graphics.component.css']
})
export class GraphicsComponent implements OnInit {
  graphicsDetails:any = [];
  constructor(private _configService:ConfigService) { }

  ngOnInit(): void {
    this._configService.onGetGraphicsDetails().subscribe( responses => {
      responses.devicerws.forEach( rest => {
        console.log(rest)
        this.graphicsDetails = rest.devicerws
      }) 
    })
  }
 
    

}
