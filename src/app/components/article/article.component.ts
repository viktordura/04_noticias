import { Component, Input, OnInit } from '@angular/core';
import { Article } from 'src/app/interfaces';
import { ArticlesComponent } from '../articles/articles.component';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {

  @Input() article : ArticlesComponent;
  @Input() index : number;


  constructor() { }

  ngOnInit() {}

}
