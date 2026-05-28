import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withFetch()),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'angular-firebase-01-f9b81',
        appId: '1:37117335706:web:23fd1c58aa970d5166e723',
        storageBucket: 'angular-firebase-01-f9b81.firebasestorage.app',
        apiKey: 'AIzaSyBmIvX3AxP2CTUEeK8emPBXNp3Po8uzRJA',
        authDomain: 'angular-firebase-01-f9b81.firebaseapp.com',
        messagingSenderId: '37117335706',
        measurementId: 'G-J2BEJ55V29',
       }),
    ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
};
