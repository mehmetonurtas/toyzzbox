"use client"
import { useActionState } from 'react';
import { uploadFile } from './action';




const initialState: { status: string; message: string } = { status: '', message: '' };
export function UploadForm() {
  const [state, formAction, isPending] = useActionState(uploadFile, initialState);



  return (
    <div>
      <form action={formAction}>
        <input type="file" id="file" name="file" accept="images/*" />
        
        <button disabled={isPending} className="bg-blue-500 text-white py-2 px-3 rounded-sm">Upload File</button>
        {isPending && <p>Loading...</p>}
      </form>

      {
        state?.status && (
          <div>
            {state?.message}
            </div>
        )
      }



deneme
      

     
    </div>
  );
}
