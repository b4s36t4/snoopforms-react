//import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { SnoopForm, SnoopPage, SnoopElement } from '@snoopforms/react';
import '../dist/styles.css';

const App = () => {
  return (
    <div style={{ padding: '30px' }}>
      <SnoopForm domain="app.snoopforms.com" protocol="http" formId="abcd">
        <SnoopPage name="basicInfo">
          <SnoopElement type="text" name="name" label="Your name" required />
          <SnoopElement
            type="textarea"
            name="about"
            label="About you"
            icon={true}
            required
          />
          <SnoopElement type="date" name="date" label="Choose Date" required />
          <SnoopElement name="submit" type="submit" label="Submit" />
        </SnoopPage>
        <SnoopPage name="advancedInfo">
          <SnoopElement
            type="checkbox"
            name="programming-lanuguages"
            label="What programming languages do you love?"
            options={['C++', 'Javascript', 'Scala', 'Assembler']}
          />
          <SnoopElement
            type="radio"
            name="favourite-food"
            label="What's your favorite food?"
            options={['Pizza', 'Pasta', 'Sushi']}
          />
          <SnoopElement name="submit" type="submit" label="Submit" />
        </SnoopPage>
        <SnoopPage name="thankyou" thankyou>
          <p>Thanks a lot for your time and insights 🙏</p>
        </SnoopPage>
      </SnoopForm>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
