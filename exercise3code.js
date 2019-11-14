describe('Test Wefox', () => {

  // * Configuration

  let until = protractor.ExpectedConditions;
  browser.waitForAngularEnabled(false);

  // * Failure management

  let failed = false;

  const skipIfFailed = () => {
    if (failed) throw new Error('Step skipped');
  }

  const raiseFail = (message) => {
    fail(message);
    failed = true;
  }

  // * Page objects

  const login = {
    open: async() => {
      await browser.get('https://my.wefox.de/login');
      return login.load();
    },
    load: async() => {
      await browser.wait(until.presenceOf(element(by.css('.wf-v-login--title'))), 10000, 'Timed out waiting for the page to load.');
      await browser.sleep(1000);
      const title = await browser.getTitle();
      return title === 'Anmeldung – wefox';
    },
    setUsername: async(value) => {
      const inputUsername = await element(by.id('user_name'));
      inputUsername.sendKeys(value);
    },
    setPassword: async(value) => {
      const inputPassword = await element(by.id('password'));
      inputPassword.sendKeys(value);
    },
    submitForm: async() => {
      const button = await element(by.css('[t-selector="login-submit"]'));
      await button.click();
      await dashboard.load();
    }
  };

  const sidebar = {
    goToContracts: async() => {
      const contractsLink = await element(by.css('[t-selector="sidebar-contracts-link"]'));
      await contractsLink.click();
      await contracts.load();
    },
    goToProfile: async() => {
      const profileLink = await element(by.css('[t-selector="sidebar-account-link"]'));
      await profileLink.click();
      await profile.load();
    },
    logout: async() => {
      const logoutLink = await element(by.css('[t-selector="sidebar-logout-link"]'));
      await logoutLink.click();
      return await home.load();
    }
  }

  const dashboard = {
    load: async() => {
      await browser.wait(until.presenceOf(element(by.css('.wf-c-header-agent__image'))), 10000, 'Timed out waiting for the page to load.');
      await browser.sleep(1000);
    },
    agentImageIsLoaded: async() => {
      const imageAgent = await element(by.css('.wf-c-header-agent__image'));
      const imageAgentWidth = await imageAgent.getAttribute('naturalWidth');
      return imageAgentWidth && imageAgentWidth !== '0';
    }
  };

  const contracts = {
    load: async() => {
      await browser.wait(until.presenceOf(element(by.css('.contracts-list'))), 10000, 'Timed out waiting for the page to load.');
      await browser.sleep(1000);
    },
    isEmpty: async() => {
      const contractList = await element(by.css('.contracts-list p:first-child'));
      const contractListText = await contractList.getText();
      return contractListText === 'No contracts added';
    }
  };

  const profile = {
    load: async() => {
      await browser.wait(until.presenceOf(element(by.css('[data-track-event-action="PersonalDetails"]'))), 10000, 'Timed out waiting for the page to load.');
      await browser.sleep(1000);
    },
    goToPersonalDetails: async() => {
      const personalDetailsLink = await element(by.css('[data-track-event-action="PersonalDetails"]'));
      await personalDetailsLink.click();
      await personalDetails.load();
    }
  };

  const personalDetails = {
    load: async() => {
      await browser.wait(until.presenceOf(element(by.css('form'))), 10000, 'Timed out waiting for the page to load.');
      await browser.sleep(1000);
    },
    printInformation: async() => {
      const formInputList = await element.all(by.css('form input'));
      if (formInputList.length === 0) return false;

      let jsonInfo = {};
      for (let i = 0; i < formInputList.length; i += 1) {
        const key = await formInputList[i].getAttribute('name');
        const val = await formInputList[i].getAttribute('value');
        if (key) jsonInfo[key] = val;
      }
      console.log(`User information: ${JSON.stringify(jsonInfo)}`);
      return true;
    }
  };

  const home = {
    load: async() => {
      await browser.wait(until.presenceOf(element(by.css('.home'))), 10000, 'Timed out waiting for the page to load.');
      await browser.sleep(1000);
      const title = await browser.getTitle();
      return title === 'So geht Versicherung heute. Dein Leben. Deine Entscheidung | wefox';
    }
  };

  // * Tests

  it('Open Login page', async() => {
    skipIfFailed();
    if (!await login.open()) raiseFail('Page loaded is not the expected one.');
  });

  it('Log in and check Agent image', async() => {
    skipIfFailed();
    await login.setUsername('aqawefox+testtecnico@wefoxgroup.com');
    await login.setPassword('qwertyasdf');
    await browser.sleep(500);
    await login.submitForm();
    if (!await dashboard.agentImageIsLoaded()) raiseFail('The agent broker image did not load.');
  });

  it('Check Contracts section', async() => {
    skipIfFailed();
    await sidebar.goToContracts();
    if (!await contracts.isEmpty()) raiseFail('The text on Contracts List is not the expected one.');
  });

  it('Print personal information', async() => {
    skipIfFailed();
    await sidebar.goToProfile();
    await profile.goToPersonalDetails();
    if (!await personalDetails.printInformation()) raiseFail('The text on Contracts List is not the expected one.');
  });

  it('Log out', async() => {
    if (!await sidebar.logout()) raiseFail('Page loaded is not the expected one.');;
  });

});