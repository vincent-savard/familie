import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { ExpoLinksView } from "@expo/samples";
import { Container, Text, Tab, Item, Label, Input } from "native-base";
import { StyledTabs } from "../StyledComponents/tabs";
import Login from "../components/login";
import Colors from "../constants/Colors.js";
import { StyledSectionTitle } from "../StyledComponents/title";
import { StyledLink } from "../StyledComponents/link";
import { StyledForm } from "../StyledComponents/form";
import { StyledItem } from "../StyledComponents/formItem";
import { StyledContent } from "../StyledComponents/mainContainer";

export default class EventScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <Container>
        <StyledTabs>
          <Tab heading="All Events">
            <StyledContent>
              <StyledSectionTitle content="Hello World" width={150} />
              <StyledLink content="Click here for more info" />
              <StyledForm>
                <StyledItem type="floatingLabel" label="Something">
                  <Input />
                </StyledItem>
                <StyledItem type="inlineLabel" label="Another Something">
                  <Input />
                </StyledItem>
              </StyledForm>
            </StyledContent>
          </Tab>

          <Tab heading="Attending">
            <StyledContent>
              {/* Put the page component here instead of Login*/}
              <Login />
            </StyledContent>
          </Tab>

          <Tab heading="Hosting">
            <StyledContent>
              {/* Put the page component here instead of Login*/}
              <Login />
            </StyledContent>
          </Tab>
        </StyledTabs>
      </Container>
    );
  }
}