import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/services/configs.service';

@Component({
  selector: 'app-graphics',
  templateUrl: './graphics.component.html',
  styleUrls: ['./graphics.component.css']
})
export class GraphicsComponent implements OnInit {
  graphicsDetails:any = []; 
  statusToggle:Boolean = false;
  loading = true;  
  constructor(private _configService:ConfigService) { }

  ngOnInit(): void {
    this.loading = true;
    this._configService.onGetGraphicsDetails().subscribe( responses => { 
      this.loading = false;
      this.graphicsDetails = responses.devicerws
    })
  }
    
  //  onShowStatus()
  //  {
  //   this.statusToggle = !this.statusToggle
  //  }

   //refresh button
  eosRefresh()
  { 
    this.loading = true;
    this._configService.onGetGraphicsDetails().subscribe( responses => { 
      this.loading = false;
      this.graphicsDetails = responses.devicerws
    })
  }

}
