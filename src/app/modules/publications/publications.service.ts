import { Injectable } from '@angular/core';
import { StringApp } from '../../resources/stringApp';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {Line} from '../../models/line';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Magazine } from '../../models/publications/magazine';
import { Book } from '../../models/publications/book';



@Injectable()
export class PublicationService
{
  stringApp: StringApp = new StringApp();

  constructor(private httpClient: HttpClient,  private router: Router)
  {

  }


   sentFile(fileSend: File){
    console.log('llegue');

    const formData: FormData = new FormData();
    const nn = JSON.stringify({
                               nn: 'juantio'
                             });
    formData.append('File', fileSend);
    formData.append('datos', nn);
    return this.httpClient.post(this.stringApp.URL_SERVICIO_REGISTRY_PUBLICATIONS, formData);
    }

    getStudent()
    {
      this.httpClient.get(this.stringApp.URL_SERVICIO_GET_STUDENT_WHIT_TOKEN + sessionStorage.getItem('token'))
      .subscribe(data =>
        {
          sessionStorage.setItem('code', data['codigo']);
          sessionStorage.setItem('nameStudent', data['nombres']+' '+ data['apellidos']);
        },
        err=>
        {
          this.router.navigate(['/404']);
        });
    }

    registryMagazine(magazine: Magazine)
    {
      const formData: FormData = new FormData();
      const metaData= JSON.stringify(
        {
          codigoEstudiante: magazine.getCode(),
          autor: magazine.getAuthor(),
          autoresSecundarios: magazine.getSecondaryAuthors(),
          fechaAceptacion: this.invertToDate(magazine.getDateAproved()),
          fechaPublicacion: this.invertToDate(magazine.getDatePublication()),
          doi: magazine.getDoi(),
          tituloArticulo: magazine.getTitleArticle(),
          nombreRevista: magazine.getNameMagazine(),
          categoria: magazine.getCategoryMagazine(),
          extensionIndice: this.determineTypeFile(magazine.getContenTable()),
          extensionArticulo: this.determineTypeFile(magazine.getArticlePDF()),
          extensionCorreoAceptacion: this.determineTypeFile(magazine.getScreenShotEmail()),
          extensionClasificacionRevista: this.determineTypeFile(magazine.getScreenShotClasification())
        }
      );
      formData.append('datos', metaData);
      formData.append('indice', magazine.getContenTable());
      formData.append('articulo', magazine.getArticlePDF());
      formData.append('correoAceptacion', magazine.getScreenShotEmail());
      formData.append('clasificacionRevista', magazine.getScreenShotClasification());
      return this.httpClient.post(this.stringApp.URL_SERVICIO_REGISTRY_PUBLICATIONS, formData,{reportProgress: true, observe: 'events'});
    }

    registryBook(book: Book)
    {
      const formData: FormData = new FormData();
      console.log('hasta antes de aca funciona'+ book.getDatePublication());
      const metaData= JSON.stringify(
        {
          codigoEstudiante: book.getCode(),
          autor: book.getAuthor(),
          autoresSecundarios: book.getSecondaryAuthors(),
          fechaAceptacion: this.invertToDate(book.getDateAproved()),
          fechaPublicacion: this.invertToDate(book.getDatePublication()),
          isbn: book.getIsbn(),
          tituloLibro: book.getTitleBook(),
          editorial: book.getEditorial(),
          pais: book.getCounty(),
          ciudad: book.getCity(),
          extensionIndice: this.determineTypeFile(book.getContenTable()),
          extensionLibro: this.determineTypeFile(book.getBookPDF()),
          extensionCertificadoEditorial: this.determineTypeFile(book.getCertificateEditorial()),
        }
      );
      formData.append('datos', metaData);
      formData.append('indice', book.getContenTable());
      formData.append('libro', book.getBookPDF());
      formData.append('certificadoEditorial', book.getCertificateEditorial());

      return this.httpClient.post(this.stringApp.URL_SERVICIO_REGISTRY_BOOK, formData, {reportProgress: true, observe: 'events'});
    }

    determineTypeFile(file: File)
    {
      const returnFile = file.type.split('/');
      if(returnFile[1] == 'jpeg')
      {
        returnFile[1] = 'jpg';
      }
      return returnFile[1];
    }

    invertToDate(date: string)
    {
      const dateAux = date.split('-');
      var dateReturn: string;
      dateReturn = '';
      for(let i = dateAux.length; i > 0; i--)
      {

        if((i-1) == 0)
        {
          dateReturn = dateReturn + dateAux[i-1];
        }
        else{
          dateReturn = dateReturn + dateAux[i-1] + '-';
        }
      }
      return dateReturn;
    }

  }


