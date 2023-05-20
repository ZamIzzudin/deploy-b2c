/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable global-require */
import React, { useEffect, useRef } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

interface CKeditorProps {
    onChange: (data: string) => void;
    editorLoaded: boolean;
    value: string;
}

export default function CKeditor({
    onChange,
    editorLoaded,
    value,
}: CKeditorProps) {
    const editorRef = useRef<{ CKEditor: typeof CKEditor; ClassicEditor: typeof ClassicEditor }>();
    useEffect(() => {
        editorRef.current = {
            CKEditor: require('@ckeditor/ckeditor5-react').CKEditor,
            ClassicEditor: require('@ckeditor/ckeditor5-build-classic'),
        };
    }, []);

    return (
        <>
            {editorLoaded ? (
                <CKEditor
                    editor={ClassicEditor}
                    data={value}
                    onChange={(event: any, editor: any) => {
                        const data = editor.getData();
                        onChange(data);
                    }}
                    config={{
                        toolbar: [
                            'heading',
                            '|',
                            'bold',
                            'italic',
                            'link',
                            'bulletedList',
                            'numberedList',
                            'blockQuote',
                        ],
                    }}
                />
            ) : (
                <div>Editor loading</div>
            )}
        </>
    );
}
