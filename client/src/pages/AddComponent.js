import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core/";
import DefineComponentForm from "../components/DefineComponentForm";
import LinkComponentForm from "../components/LinkComponentForm";
import SubmitComponentForm from "../components/SubmitComponentForm";
import ComponentCard from "../components/ComponentCard";
import API from "../utils/API";

const useStyles = makeStyles((theme) => ({
  paper: {
    width: "auto",
    marginTop: theme.spacing(8),
    marginLeft: theme.spacing(24),
    marginRight: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(
      3
    )}px`,
    [theme.breakpoints.down(960)]: {
      marginTop: theme.spacing(4),
      marginLeft: theme.spacing(10),
      marginRight: theme.spacing(0),
    },
    [theme.breakpoints.down(620)]: {
      marginLeft: theme.spacing(4),
    },
  },
  form: {
    marginTop: theme.spacing(4),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: `100%`,
    marginLeft: theme.spacing(4),
    marginRight: theme.spacing(4),
    padding: `${theme.spacing(8)}px ${theme.spacing(3)}px ${theme.spacing(
      3
    )}px`,
    [theme.breakpoints.down(960)]: {
      width: "auto",
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      paddingTop: theme.spacing(1),
    },
  },
  type: {
    [theme.breakpoints.down(960)]: {
      fontSize: theme.spacing(3),
    },
  },
}));

function AddComponent(props) {
  const classes = useStyles();
  const [formState, setFormState] = useState({
    items: [],
    currentItem: {},
    formStep: 1,
  });

  useEffect(() => {
    API.getComponents()
      .then((res) => setFormState({ items: res.data, formStep: 1 }))
      .catch((err) => console.log(err));
  }, []);

  const handleBackClick = () => {
    setFormState({
      items: [],
      currentItem: {},
      formStep: 1,
    });
  };

  return (
    <>
      <CssBaseline />
      <Box>
        <Container maxWidth="md">
          <Paper className={classes.paper} elevation={6}>
            <Typography
              className={classes.type}
              align="center"
              variant="h2"
              gutterBottom
            >
              Add a component to the database
            </Typography>
            {formState.formStep === 1 && (
              <DefineComponentForm
                setFormState={(value) =>
                  setFormState({
                    ...formState,
                    currentItem: value,
                    formStep: 2,
                  })
                }
              />
            )}
            {formState.formStep === 2 && (
              <LinkComponentForm
                name="a point of contact"
                relationship="pointsOfContact"
                items={formState.items}
                currentItem={formState.currentItem}
                setFormState={(values) =>
                  setFormState({
                    ...formState,
                    currentItem: { ...formState.currentItem, ...values },
                    formStep: 3,
                  })
                }
              />
            )}
            {formState.formStep === 3 && (
              <LinkComponentForm
                name=" an influence"
                relationship="influencers"
                items={formState.items}
                currentItem={formState.currentItem}
                setFormState={(value) =>
                  setFormState({
                    ...formState,
                    currentItem: { ...formState.currentItem, ...value },
                    formStep: 4,
                  })
                }
              />
            )}
            {formState.formStep === 4 && (
              <SubmitComponentForm
                items={formState.items}
                currentItem={formState.currentItem}
                setFormState={(value) =>
                  setFormState({
                    ...formState,
                    currentItem: { ...formState.currentItem, ...value },
                    formStep: 5,
                  })
                }
              />
            )}
            {formState.formStep === 5 && (
              <>
                <h1>Your Component has been Submitted</h1>
                <ComponentCard
                  currentItem={formState.currentItem}
                  resetFormState={(value) =>
                    setFormState({
                      ...formState,
                      currentItem: { ...formState.currentItem, ...value },
                      formStep: 1,
                    })
                  }
                ></ComponentCard>
                <Button
                  align="left"
                  variant="contained"
                  color="primary"
                  onClick={(event) => handleBackClick()}
                >
                  Add another Component
                </Button>
              </>
            )}
          </Paper>
        </Container>
      </Box>
    </>
  );
}

export default AddComponent;
