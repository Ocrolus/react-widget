import { useEffect, useState } from "react";
import { Box, Input, Button, CircularProgress } from "@mui/material";
import Sidebar from "packages/example/src/Components/Sidebar";
import IncomePrompt from "packages/example/src/Components/IncomePrompt";
import "packages/example/src/App.css";
import Module from "packages/example/src/Components/Module";
import { useInitializer, useWidget } from "ocrolus-widget-react";
import { WIDGET_HOST } from "packages/ocrolus-widget-react/src/constants";

const widgetUuid = '4fd02492-9f30-4df5-8a0f-33a7483e2051';

function App() {
  const [options, setOptions] = useState({
    widgetUuid,
  });
  const { ready, open } = useWidget(options);
  useInitializer({ widgetUuid, host: WIDGET_HOST })
  console.log(ready)
  const [userKey, setUserKey] = useState("");
  const [bookName, setFolderName] = useState("");

  const [submit, setSubmit] = useState(false);
  useEffect(() => {
    if (submit) {
      (async function () {
        const response = await fetch("https://auth.ocrolusexample.com/token", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: userKey,
            bookName,
          }),
        });
        const json = await response.json();
        setOptions(prevOpts => ({
          ...prevOpts, token: json.accessToken,
        }));
        return json.accessToken;
      }());
    };
  }, [userKey, bookName, submit]);

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box
        component="main"
        className="content-column"
        sx={{ flexGrow: 1, p: 3 }}
      >
        <IncomePrompt />
        <Box
          sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
        >
          <Input
            style={{ marginRight: "15px" }}
            type="text"
            placeholder="Enter User Key"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUserKey(e.target.value)
            }
          />
          {userKey && (
            <Input
              style={{ marginRight: "15px" }}
              type="text"
              placeholder="Enter Book Name"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFolderName(e.target.value)
              }
            />
          )}
          <Button onClick={() => setSubmit(!submit)}>Get Token</Button>
        </Box>
        <Module>
            {ready ? <div onClick={() => open()} >hello!!!</div> : <Box>hello</Box>}
          <Box id="ocrolus-widget-frame"/>
        </Module>
      </Box>
    </Box>
  );
}

export default App;
