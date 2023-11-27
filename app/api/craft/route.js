import db from '@/app/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { nanoid } from 'nanoid';

const COLLECTTION_NAME = 'timely-capsule';

const craft = async (params, attempt = 0) => {
  const generateID = nanoid(8);
  if (attempt > 5) {
    throw new Error('Exceeded maximum attempts to generate a unique ID');
  }

  const docRef = doc(db, COLLECTTION_NAME, generateID);

  try {
    const idExists = await getDoc(docRef);

    if (idExists.exists()) {
      console.log('Document ID already exists. Retrying...');
      return craft(params, attempt + 1);
    } else {
      await setDoc(docRef, params);
      return { url: generateID, docRef };
    }
  } catch (error) {
    console.error('Error creating document:', error);
    throw new Error('Failed to create document');
  }
};

export async function POST(request) {
  const forminputs = await request.json();
  const p = await craft(forminputs);
  return Response.json(p);
}
