import { FavoriteService } from 'src/app/services/favorite.service';
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-film-details',
  templateUrl: './film-details.page.html',
  styleUrls: ['./film-details.page.scss'],
})
export class FilmDetailsPage implements OnInit {

  film: any;
  isFavorite = false;
  filmId = null

  constructor(private activatedRoute: ActivatedRoute, private api: ApiService
    , private emailComposer: EmailComposer, private toastController: ToastController
    ,private favoriteService: FavoriteService) { }

  ngOnInit() {
    this.filmId = this.activatedRoute.snapshot.paramMap.get('id');
    this.api.getFilm(this.filmId).subscribe(res =>{
      this.film = res;
    });
    this.favoriteService.isFavorite(this.filmId).then(isFav =>{
      this.isFavorite = isFav;
    });
  }

  favoriteFilm() {
    this.favoriteService.favoriteFilm(this.filmId).then(() => {
      this.isFavorite = true;
    });
  }

  unfavoriteFilm() {
    this.favoriteService.unfavoriteFilm(this.filmId).then(() => {
      this.isFavorite = false;
    })
  }

  async shareFilm(){
    let email = {
      to: 'dawood.zeeshan@gmail.com',
      subject: 'This is a movie test:' + this.film.title,
      body: 'Can you remember the opening?<br><br>\"' + this.film.opening_crawl + '\"',
      isHtml: true
    };
    this.emailComposer.open(email);
    const toast = await this.toastController.create({
      message: 'Email Sent',
      showCloseButton: true,
      position: 'bottom',
      closeButtonText: 'Done'
    });
    toast.present();
  }

}
