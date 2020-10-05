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
      console.log(responses.devicerws)
      this.graphicsDetails = responses.devicerws
      // responses.devicerws.forEach( rest => {
      
      //   this.graphicsDetails = rest.devicerws
      // }) 
    })
  }
 
    

}
