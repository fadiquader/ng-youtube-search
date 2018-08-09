import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {SearchResult} from '../models/search-result';

const YOUTUBE_API_KEY = 'AIzaSyCyHgyf4X7Tq6FKtsYHRGpBSTzDjJHh_ps';
const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3/search';


@Injectable({
  providedIn: 'root'
})
export class YoutubeSearchService {

  constructor(private http: HttpClient) {
  }

  search(query: string): Observable<SearchResult[]> {
    const params: string = [
      `q=${query}`,
      `key=${YOUTUBE_API_KEY}`,
      `part=snippet`,
      `type=video`,
      `maxResults=10`
    ].join('&');
    const queryUrl = `${YOUTUBE_API_URL}?${params}`;
    return this.http.get(queryUrl)
      .pipe(
        map(response => {
          return <any>response['items']
            .map(item => {
              // console.log("raw item", item); // uncomment if you want to debug
              return new SearchResult({
                id: item.id.videoId,
                title: item.snippet.title,
                description: item.snippet.description,
                thumbnailUrl: item.snippet.thumbnails.high.url
              });
            });
        })
      );
  }
}
