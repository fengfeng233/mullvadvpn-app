import * as React from 'react';
import { Component, Text, View } from 'reactxp';
import { links } from '../../config.json';
import AccountExpiry from '../../shared/account-expiry';
import { AccountToken } from '../../shared/daemon-rpc-types';
import { messages } from '../../shared/gettext';
import styles from './NewAccountViewStyles';
import { AccountTokenLabel } from './Account';
import * as AppButton from './AppButton';

interface INewAccountViewProps {
  accountToken?: AccountToken;
  accountExpiry?: AccountExpiry;
  updateAccountData: () => void;
  hideWelcomeView: () => void;
  onExternalLinkWithAuth: (url: string) => Promise<void>;
}

export default class NewAccountView extends Component<INewAccountViewProps> {
  private updateAccountDataInterval?: number;

  public componentDidMount() {
    this.updateAccountDataInterval = setInterval(this.props.updateAccountData, 30 * 1000);
  }

  public componentDidUpdate() {
    if (this.props.accountExpiry && !this.props.accountExpiry.hasExpired()) {
      this.props.hideWelcomeView();
    }
  }

  public componentWillUnmount() {
    clearInterval(this.updateAccountDataInterval);
  }

  public render() {
    return (
      <View style={styles.container}>
        <View style={styles.body}>
          <View style={styles.title}>{messages.pgettext('new-account-view', 'Congrats!')}</View>
          <View style={styles.message}>
            <Text style={styles.fieldLabel}>
              {messages.pgettext('new-account-view', "Here's your account number! Save it!")}
            </Text>
            <AccountTokenLabel
              style={styles.accountToken}
              accountToken={this.props.accountToken || ''}
            />
          </View>

          <View style={styles.message}>
            {messages.pgettext(
              'new-account-view',
              'To start using the app you first need to add time to you account. You can either buy it online or redeem a voucher if you have one.',
            )}
          </View>
        </View>
        {this.createFooter()}
      </View>
    );
  }

  private createFooter() {
    return (
      <View style={styles.footer}>
        <AppButton.BlockingButton onPress={this.openPaymentUrl}>
          <AppButton.GreenButton>
            <AppButton.Label>{messages.pgettext('new-account-view', 'Buy online')}</AppButton.Label>
            <AppButton.Icon source="icon-extLink" height={16} width={16} />
          </AppButton.GreenButton>
        </AppButton.BlockingButton>
      </View>
    );
  }

  private openPaymentUrl = async (): Promise<void> => {
    await this.props.onExternalLinkWithAuth(links.purchase);
  };
}
