import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  doc,
  orderBy,
  query,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AuthService } from '../../../core/services/auth';
import { ContactRequest, RequestStatus } from '../models/portfolio.models';

@Injectable({ providedIn: 'root' })
export class RequestsService {
  private firestore = inject(Firestore);
  private auth = inject(AuthService);

  private readonly col = collection(this.firestore, 'contact_requests');

  async createRequest(
    payload: Omit<
      ContactRequest,
      'id' | 'userUid' | 'userEmail' | 'createdAt' | 'status'
    >,
  ): Promise<string> {
    const user = this.auth.currentUser();
    if (!user) {
      throw new Error('Necesitas iniciar sesión para enviar una solicitud.');
    }

    const docRef = await addDoc(this.col, {
      ...payload,
      userUid: user.uid,
      userEmail: user.email ?? '',
      status: 'Pendiente' as RequestStatus,
      createdAt: Date.now(),
    });
    return docRef.id;
  }

  getMyRequests(): Observable<ContactRequest[]> {
    const uid = this.auth.uid;
    if (!uid) {
      return new Observable((sub) => sub.next([]));
    }
    const q = query(
      this.col,
      where('userUid', '==', uid),
      orderBy('createdAt', 'desc'),
    );
    return collectionData(q, { idField: 'id' }) as Observable<ContactRequest[]>;
  }

  getReceivedRequests(developerSlug: string): Observable<ContactRequest[]> {
    const q = query(
      this.col,
      where('developerSlug', '==', developerSlug),
      orderBy('createdAt', 'desc'),
    );
    return collectionData(q, { idField: 'id' }) as Observable<ContactRequest[]>;
  }

  async updateRequest(
    id: string,
    changes: Partial<Pick<ContactRequest, 'status' | 'response'>>,
  ): Promise<void> {
    const ref = doc(this.firestore, `contact_requests/${id}`);
    await updateDoc(ref, { ...changes, updatedAt: Date.now() });
  }
}
