import { Component } from '@angular/core';
import { Article } from 'src/app/interfaces';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  
  
  get articles() : Article[] {
    return this.storageServices.getLocalArticles;
  }

  constructor( private storageServices : StorageService) {}

}
