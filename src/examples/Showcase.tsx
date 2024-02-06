import {StrictMode, useState} from 'react';
import {useWidget, OcrolusUpload, OcrolusUploadNative} from 'src/useWidget';

function LibraryStart() {
  const [showButton, setButton] = useState<boolean>(false);
  const options = {
    widgetUuid: '145a1aaf-4af1-4dae-9d11-5d8e5bc583f7',
  };
  const {ready, open} = useWidget(options);

  return (
    <>
      <div>
        <button onClick={() => setButton(!showButton)}> show native </button>
      </div>
      <div>
        <OcrolusUpload {...options}>Launch Widget Modal</OcrolusUpload>
      </div>

      <div>
        {ready ? <button onClick={open}> open hook widget</button> : <div> hook not ready </div>}
      </div>

      {showButton ? (
        <div style={{height: '300px', width: '500px'}}>
          <OcrolusUploadNative notReady={() => <div> GET OUTTA HERE </div>} {...options} />
        </div>
      ) : (
        <div> Other content</div>
      )}
    </>
  );
}

export default function LibraryApp() {
  return (
    <StrictMode>
        <LibraryStart />
    </StrictMode>
  );
}
