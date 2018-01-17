import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { MovieProvider } from '../../providers/movie/movie';
import { FilmeDetalhesPage } from '../filme-detalhes/filme-detalhes';

/**
 * Generated class for the FeedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html',
  providers: [
    MovieProvider
  ]
})
export class FeedPage {
  public feed = {
    title: "Vitor Küster Bona",
    date: "November 25, 1993",
    description: "Wait a minute. Wait a minute, Doc. Uhhh... Are you telling me that you built a time machine... out of a DeLorean?! Whoa. This is heavy.",
    qnt_likes: 53,
    qnt_comments: 5,
    time_comment: "11h ago"
  };

  public listaFilmes = new Array<any>();
  public pageNumber = 1;
  public nomeUsuario:string = "Vitor Küster Bona";
  public loader;
  public refresher;
  public isRefreshing: boolean = false;
  public infiniteScroll;
  public pageOld = 0;
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private movieProvider: MovieProvider,
    public loadingCtrl: LoadingController) {
  }

  abreCarregando() {
    this.loader = this.loadingCtrl.create({
      content: "Carregando filmes..."
    });
    this.loader.present();
  }

  fechaCarregando() {
    this.loader.dismiss();
  }

  public somaDoisNumeros(num1:number, num2:number):void {
    alert(num1 + num2);
  }

  doRefresh(refresher) {
    this.refresher = refresher;
    this.isRefreshing = true;

    this.carregarFilmes();
  }

  abrirDetalhes(filme) {
    this.pageOld = this.pageNumber;
    this.navCtrl.push(FilmeDetalhesPage, { id: filme.id });
  }

  ionViewDidEnter() {
    this.carregarFilmes();
  }

  private carregarFilmes(newpage: boolean = false) {
    if( this.pageNumber != this.pageOld) {
    this.abreCarregando();
    this.movieProvider.getLatestMovies(this.pageNumber).subscribe(
      data => {
        const respopnseJson = JSON.parse((data as any)._body);

        if(newpage) {
          this.listaFilmes = this.listaFilmes.concat(respopnseJson.results);
          this.infiniteScroll.complete();
        } else {
          this.listaFilmes = respopnseJson.results;
        }

        console.log(respopnseJson);
        this.stopRefreshing();
      }, error => {
        console.log(error);
        this.stopRefreshing();
      }
    );
  }
  }

  private stopRefreshing() {
    this.fechaCarregando();
    if(this.isRefreshing) {
      this.refresher.complete();
      this.isRefreshing = false;
    }
  }

  doInfinite(infiniteScroll) {
    console.log('Begin async operation');
    this.pageNumber++;
    this.infiniteScroll = infiniteScroll;
    this.carregarFilmes(true);
  }

}
