import db from '@/app/firebase';
import { doc, getDoc } from 'firebase/firestore';

const COLLECTTION_NAME = 'timely-capsule';

export async function GET(request, { params }) {
  const { id } = params;
  const docRef = doc(db, COLLECTTION_NAME, id);

  try {
    const idExists = await getDoc(docRef);
    if (idExists.exists()) {
      return Response.json({ ...idExists.data(), url: id });
    } else {
      return Response.json({ url: 0, docRef: idExists.data() });
    }
  } catch (error) {
    console.error('Error creating document:', error);
  }
}
