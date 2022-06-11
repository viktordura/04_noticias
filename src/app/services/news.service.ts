import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from "rxjs/operators";
import { environment } from 'src/environments/environment';

import { NewsResponse,Article,ArticlesByCategoryAndPage } from '../interfaces';



const apiKey = environment.apiKey;
const apiUrl = environment.apiUrl;


@Injectable({
  providedIn: 'root'
})
export class NewsService {


  private ArticlesByCategoryAndPage : ArticlesByCategoryAndPage = {}

  constructor(private http : HttpClient ) { }

  private executeQuery<T>( endpoint: string ){
    return this.http.get<T>(`${ apiUrl }${ endpoint } `,{
      params: {
        apiKey: apiKey,
        country: 'us',
      }
    });
  }

  getTopHeadLines(): Observable<Article[]> {
    
    return this.getTopHeadlinesByCategory( 'business' )
    // return this.executeQuery<NewsResponse>(`/top-headlines?category=business&`)
    //   .pipe(
    //     map( ({ articles }) => articles )
    //   );


  }

  getTopHeadlinesByCategory( category: string, loadmore : boolean = false) : Observable<Article[]>{

    if( loadmore ){
      return this.getArticlesByCategory( category )
    }

    if ( this.ArticlesByCategoryAndPage[category] ) {
      return of(this.ArticlesByCategoryAndPage[category].articles);
    }

    return this.getArticlesByCategory( category );
  }

  private getArticlesByCategory( category: string) : Observable<Article[]>{

    if( Object.keys( this.ArticlesByCategoryAndPage ).includes(category) ){
     
    } else{
      this.ArticlesByCategoryAndPage[category] = {
        page: 0,
        articles: []
      }
    }

    const page =  this.ArticlesByCategoryAndPage[category].page + 1;
  
    return this.executeQuery<NewsResponse>(`/top-headlines?category=${ category }&$page=${ page }`)
      .pipe(
        map( ({ articles }) => {
          
          if ( articles.length === 0  ) return this.ArticlesByCategoryAndPage[category].articles;


          this.ArticlesByCategoryAndPage[category] = {
            page: page,
            articles: [ ...this.ArticlesByCategoryAndPage[category].articles, ...articles ]

          }
          
          return this.ArticlesByCategoryAndPage[category].articles;
        } )
      );


  }


}
