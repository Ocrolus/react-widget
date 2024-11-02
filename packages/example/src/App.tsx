import { useEffect, useState } from "react";
import { Box, Input, Button, CircularProgress } from "@mui/material";
import Sidebar from "@example/src/Components/Sidebar";
import IncomePrompt from "@example/src/Components/IncomePrompt";
import "@example/src/App.css";
import Module from "@example/src/Components/Module";
import { useWidget } from "ocrolus-widget-react";


function App() {
  const options = {
    widgetUuid: "145a1aaf-4af1-4dae-9d11-5d8e5bc583f7",
  };
  const { ready, open } = useWidget(options);
  const [userKey, setUserKey] = useState("");
  const [bookName, setFolderName] = useState("");
  const [submit, setSubmit] = useState(false);
  useEffect(() => {
    if (submit) {
      (window as any).getAuthToken = async function () {
        const response = await fetch("https://auth.ocrolusexample.com/token", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: userKey,
            bookName: bookName,
          }),
        });
        const json = await response.json();
        return json.accessToken;
      };
    }
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
          <Box id="ocrolus-widget-frame">
            {ready ? <CircularProgress /> : <Box>hello</Box>}
          </Box>
        </Module>
      </Box>
    </Box>
  );
}

export default App;
