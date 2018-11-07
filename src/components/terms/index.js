import React from 'react';
import { View, ScrollView } from 'react-native';
import { H1, H4, Small, B } from '../toolBox/typography';
import withTheme from '../withTheme';
import getStyles from './styles';

/* eslint-disable */
const Terms = ({ styles }) => (
  <ScrollView style={styles.container}>
    <View style={styles.innerContainer}>
      <View style={styles.titleContainer}>
        <H1 style={styles.title}>Terms of use</H1>
        <B style={styles.subTitle}>
          Please read these terms of use carefully.{'\n'}
          By accessing or using our services, you{'\n'}
          agree to be bound by these terms of use{'\n'}
          and all terms incorporated by reference.
        </B>
      </View>
      <View style={styles.row}>
        <H4 style={styles.itemTitle}>1. SCOPE</H4>
        <Small style={styles.itemDescription}>
          These are the Terms of Use (hereinafter referred to as the “Terms”) of the Lisk Foundation (hereinafter referred to as “Lisk”, ”we” or “us”). These Terms apply to any access and use of Lisk Hub, Lisk Nano and Lisk Commander (collectively referred to hereinafter as “Lisk Wallets” or “Lisk Wallet”), the Lisk cryptographic token (hereinafter referred to as “LSK”), the Lisk website at https://www.lisk.io/, the online services, and any Lisk’s services related to or utilizing any of the foregoing which we refer to in these Terms, collectively, as “Services”, “Lisk Services” or “our Services”.
        </Small>
        <H4 style={styles.itemTitle}>2. ELIGIBILITY AND AGREEMENT</H4>
        <Small style={styles.itemDescription}>
          {'\n'}
          You must ensure that you use and access Lisk Services only in your own name. If you are acting for a legal entity, you must ensure that you:
          {'\n'}
          (a) use and access Lisk Services on behalf of the legal entity; and
          {'\n'}
          (b) that you are authorised to enter into transactions on behalf of the legal entity.
          {'\n'}
        </Small>
        <H4 style={styles.itemTitle}>3. YOUR RESPONSIBILITIES REGARDING THE USE OF THE SERVICES</H4>
        <Small style={styles.itemDescription}>
          {'\n'}
           You are also responsible for maintaining adequate security, control and confidentiality of your device access, your Lisk Wallets information, including passwords, passphrases, private keys or other codes associated with your Lisk Wallets and any activity occurring within these Lisk Wallets. The loss or compromise of this information may result in unauthorized access of your Lisk Wallets, and loss or theft of any LSK and other cryptographic tokens held in your Lisk Wallets.
          {'\n'}
          If you believe your Lisk Wallets have been compromised, or you need to report a security incident, or you have experienced any operational problems, or have a security concern, please contact us immediately at help@lisk.io describing the issue at hand as thoroughly as possible including the date, type of problem and part of the Lisk site or Lisk Services where you experienced that problem. You are responsible for (i) immediately notifying us of any unauthorized use of your password or Lisk Wallets or any other breach of security, and (ii) ensuring that you log out from your Lisk Wallets at the end of each session when accessing the Lisk Services.
          {'\n'}
          We have no responsibility for any loss that you suffer as a result of failing to comply with this section or failure to follow or act on any notices or alerts that we may send to you.
          {'\n'}
        </Small>
        <H4 style={styles.itemTitle}>4. AVAILABILITY OF SERVICES</H4>
        <Small style={styles.itemDescription}>
          {'\n'}
          Subject to these Terms, Lisk shall use reasonable efforts to make available, operate and maintain the Lisk Services during the term of these Terms and to permit you to access and use the Lisk Services in accordance with these Terms. Lisk shall use all reasonable efforts to promptly notify you of any difficulties experienced by us or other participants with respect to their access to or the use of the Lisk Services, but only to the extent that Lisk is aware of such difficulties and reasonably determines that they are material to your access and use of the Lisk Services. Similarly, you shall notify Lisk the soonest possible in case you become aware of any material technical failures of or difficulties with the Lisk Services or upon becoming aware of any material breach (or any event which, by giving notice and/or the lapse of time, would constitute a material breach) of these Terms.
          {'\n'}
          Our Services may evolve over time. This means we may apply changes, replace, or discontinue (temporarily or permanently) our Services at any time for any reasonable cause with two days’ notice or without notice in case of a Force Majeure. In this case, you may be prevented from accessing or using our Services. If, in our sole discretion, we decide to permanently discontinue our Services, we will provide you with a notice via our website, via our Twitter account or any other means of communication we deem appropriate.
          {'\n'}
          You accept and acknowledge that the Lisk Services may not be accessible in every country of your residence, in particular because of regulatory requirements.
          {'\n'}
        </Small>
        <H4 style={styles.itemTitle}>5. FORCE MAJEURE</H4>
        <Small style={styles.itemDescription}>
          {'\n'}
          A Force Majeure Event includes without limitation each of the following:
          {'\n'}
          a) Government actions, the outbreak of war or hostilities, the threat of war, acts of terrorism, national emergency, riot, civil disturbance, sabotage, requisition, or any other international calamity, economic or political crisis;
          {'\n'}
          b) Act of God, earthquake, tsunami, hurricane, typhoon, accident, storm, flood, fire, epidemic or other natural disaster;
          {'\n'}
          c) Labour disputes and lock-out;
          {'\n'}
          d) Breakdown, failure or malfunction of any electronic, network and communication lines or systems (not due to the fault of Lisk);
          {'\n'}
          e) Any event, act or circumstances not reasonably within Lisk’s control and the effect of that event(s) is such that Lisk is not in a position to take any reasonable action to cure the default.
          {'\n'}
        </Small>
        <Small style={styles.itemDescription}>
          {'\n'}
            You understand and accept the risks in connection with the use of the Lisk Wallet app and using the Services as set forth above and hereinafter. In particular, but not limited to, you understand the inherent risks listed hereinafter:
          {'\n'}
            a) Risk of software weaknesses: You understand and accept that the underlying software application and software platform is still in an early development stage and unproven, why there is no warranty that the Services will be uninterrupted or error-free and why there is an inherent risk that the software could contain weaknesses, vulnerabilities or bugs causing, inter alia, the complete loss of LSK.
          {'\n'}
            b) Regulatory risk: You understand and accept that blockchain technology allows new forms of interaction and that it is possible that certain jurisdictions will apply existing regulations on, or introduce new regulations addressing, blockchain technology based applications, which may be contrary to the current setup of Lisk and which may, inter alia, result in substantial modifications of the Lisk Services, including its termination.
          {'\n'}
            c) Risk of loss of private key or passphrase(s): Lisk Wallet can only be accessed by using a Lisk Wallet passphrase with the possibility of using a second passphrase. You understand and accept that if your private key, passphrase or second passphrase respectively got lost or stolen, the LSK within your Lisk Wallet will be unrecoverable and will be permanently lost.
          {'\n'}
            d) Risk of voting attacks: You understand and accept that the blockchain used for by Lisk is susceptible to voting attacks, including but not limited to majority voting power attacks, “selfish-voting” attacks, and race condition attacks. Any successful attacks present a risk to the Lisk Services.
          {'\n'}
          e) Risk of delegate attacks: You understand and accept that the blockchain used for by Lisk is susceptible to delegate attacks, including but not limited to double-spending attacks, majority delegate attacks, and race condition attacks. Any successful attacks present a risk to the Lisk Services.
          </Small>
          <H4 style={styles.itemTitle}>7. PUBLIC AND PRIVATE KEY, PASSPHRASES</H4>
          <Small style={styles.itemDescription}>
            {'\n'}
              When you create a Lisk Wallet, the Services generate a digital private and public key pair and a passphrase. The Services never store either private key or passphrase. The public key generated by the Services is being used to generate a Lisk Wallet address, and may be shared with the network and with others to complete transactions. The private key is associated to a Lisk Wallet address and must be used in conjunction with the Lisk Wallet address to authorize transactions from or to that Lisk address.
            {'\n'}
              You need to make sure that your passphrase(s) are properly backed up and protected from theft.
            {'\n'}
          </Small>
          <H4 style={styles.itemTitle}>8. DATA PROTECTION</H4>
          <Small style={styles.itemDescription}>
        {'\n'}
          The information provided pursuant to these Terms will be used by Lisk for the purposes of providing you with services and data pursuant to these Terms and enabling Lisk to perform its activities.
        {'\n'}
          You acknowledge and agree that Lisk may disclose your data, including personal data and sensitive personal data as defined under the Swiss Federal Data Protection Act (“Participant Data”) to outside organisations for the purpose of providing services and data to you, and performing its activities. You explicitly consent to the export of your data to a location outside your country of domicile and to third parties outside of Lisk.
        {'\n'}
          </Small>
          <H4 style={styles.itemTitle}>9. PROHIBITED ACTIVITIES</H4>
          <Small style={styles.itemDescription}>
        {'\n'}
          You agree that you will not use the Lisk Services to perform any type or sort of illegal activity or to take any action that negatively affects the performances of the Lisk Services. You may not engage via the Services in any of the following activities, nor help a third party in any such activity to:
        {'\n'}
          1) attempt to gain unauthorized access to our Services or another user’s Lisk Wallet;
        {'\n'}
          2) make any attempt to bypass or circumvent any security features;
        {'\n'}
          3) violate any law, statute, ordinance, regulation or these Terms and other contractual documents as referred to herein;
        {'\n'}
          4) reproduce, duplicate, copy, sell or resell our Services for any purpose except as authorized in these Terms;
        {'\n'}
          </Small>
          <H4 style={styles.itemTitle}>10. DEFAULT</H4>
          <Small style={styles.itemDescription}>
        {'\n'}
          Each of the following constitutes an “Event of Default”:
        {'\n'}
          a) Where any representation or warranty made by you is or becomes untrue;
        {'\n'}
          b) Any other circumstance where Lisk reasonably believes that it is necessary or desirable to take any action set out in the below paragraph;
        {'\n'}
          c) You are performing a prohibited activity as specified in section 9, you involve Lisk in any type of fraud or illegality and if Lisk suspects that you are engaged into money laundering activities or terrorist financing or other criminal activities;
        {'\n'}
          d) Commencement of proceedings or investigations against you by a governmental authority, including but not limited to the request for an action set out in the below paragraph by a competent governmental authority or body or court;
        {'\n'}
          e) In cases of material violation by you of the requirements established by any applicable laws, such materiality determined in good faith by Lisk;
        {'\n'}
          f) Any other situation where it would not be in the best interest of Lisk that you continue to be a participant.
        {'\n'}
          If an Event of Default occurs, Lisk may at its absolute discretion, at any time and without prior notice, take one or more of the following actions:
        {'\n'}
          a) Terminate these Terms without notice;
        {'\n'}
          b) Close any or all of your Lisk Wallets;
        {'\n'}
          c) Refuse to open a new Lisk Wallet for you.
        {'\n'}
          </Small>
          <H4 style={styles.itemTitle}>11. INDEMNIFICATION</H4>
          <Small style={styles.itemDescription}>
        {'\n'}
          You agree to indemnify, defend and hold Lisk, its employees, agents, consultants, subsidiaries, partners, affiliates, and licensors, harmless against any and all claims, costs, losses, damages, liabilities, judgments and expenses (including reasonable fees of attorneys and other professionals) arising from or in any way related to your use of our Services, your violation of these Terms, or your violation of any rights of any other person or entity.
        {'\n'}
          </Small>
          <H4 style={styles.itemTitle}>12. LIMITATION OF LIABILITY</H4>
          <Small style={styles.itemDescription}>
        {'\n'}
          To the extent permitted by applicable law, Lisk and its auxiliary persons shall not be liable for any damage arising out of, or in connection with, this agreement.
        {'\n'}
          Lisk shall assume no liability for any further claims, e.g. relating to compensation for indirect or consequential loss, lost profit or loss of earnings, unrealised savings or additional expense incurred, regardless of the legal grounds.
        {'\n'}
          You are fully aware that the access to and the use of the Lisk Services through the internet, the Lisk Wallets and from abroad might violate foreign laws applicable to you. You undertake to inform yourself and to assume sole liability for any risks relating to such foreign legislation. Any responsibility of Lisk regarding the possible infringement of foreign laws in connection with your use of the Services from abroad is expressly and completely excluded.
        {'\n'}
          Lisk shall assume no liability for losses if, for reasons for which Lisk cannot be held responsible, Lisk has been prevented from performing the transaction properly or on time, for example as a result of Force Majeure or measures, orders and/or decrees issued by domestic or foreign governmental authorities.
        {'\n'}
          In particular, Lisk shall assume no liability for actions (e.g. declarations of Default), failure to take action or any suspension or restriction of services by any element within the blockchain. Furthermore, Lisk shall assume no liability for the consequences of regulatory measures implemented by competent regulators with regard to any of the Lisk Services.
        {'\n'}
          </Small>
          <H4 style={styles.itemTitle}>13. TERMINATION</H4>
          <Small style={styles.itemDescription}>
        {'\n'}
          Lisk reserves the right to close a Lisk Wallet without prior notice immediately on the grounds of misusage particularly violations of these Terms or any applicable law.
        {'\n'}
          </Small>
          <H4 style={styles.itemTitle}>14. TAXATION</H4>
          <Small style={styles.itemDescription}>
        {'\n'}
          You bear the sole responsibility to determine if your use of the Services and/or any other action or transaction related to LSK have tax implications for you.
        {'\n'}
          By using the Services, and to the extent permitted by law, you agree not to hold Lisk liable for any tax liability associated with or arising from the operation of the Services or any other action or transaction related to Lisk Services.
        {'\n'}
          </Small>
          <H4 style={styles.itemTitle}>15. ENTIRE AGREEMENT</H4>
          <Small style={styles.itemDescription}>
        {'\n'}
          These Terms, together with any other agreements that apply to you constitute the entire and exclusive agreement between us and you regarding its subject matter, and supersede and replace any previous or contemporaneous written or oral contract, warranty, representation or understanding regarding its subject matter.
        {'\n'}
          </Small>
          <H4 style={styles.itemTitle}>16. SEVERABILITY</H4>
          <Small style={styles.itemDescription}>
        {'\n'}
          If for any reason a court of competent jurisdiction finds any provision of these Terms invalid or unenforceable or illegal or contravene any rule, regulation or law of any market or regulator, that part will be deemed to have been excluded from these Terms from the beginning, and these Terms will be interpreted and enforced as though the provision had never been included and the legality or enforceability of the remaining provisions of the Terms or the legality, validity or enforceability of this provision in accordance with the law and/or regulation of any other jurisdiction, shall not be affected but should remain in full force and effect.
        {'\n'}
          </Small>
          <H4 style={styles.itemTitle}>17. CHANGES TO THESE TERMS</H4>
          <Small style={styles.itemDescription}>
        {'\n'}
          The present Terms may change from time to time, including but not limited to cases of changes in our Services, in technology, in regulation and for any other case that Lisk deems as appropriate to take measures. In case of a change, we will provide you with notice of such change by posting the updated Terms on our website and changing the "Last Updated" date at the bottom of these Terms. Any amended Terms shall become effective not earlier than 14 days after they are posted and shall apply prospectively to the use of the Services upon effectiveness of such changes. However, in case the changes address new functions of Lisk Services or they are made for any legal reasons, they shall be of immediate effect. Upon effectiveness of the change as described above, the change of Terms shall be considered as accepted by you in case you continue using the Lisk Services. Therefore, in case you do not agree to any amended Term, you must immediately cease using the Lisk Services.
        {'\n'}
          </Small>
          <H4 style={styles.itemTitle}>18. COMMUNICATIONS AND WRITTEN NOTICES</H4>
          <Small style={styles.itemDescription}>
        {'\n'}
          Unless the contrary is specifically provided in these Terms, any notice, instruction, request or other communication to be given to Lisk by the participant under these Terms shall be in writing and shall be sent to Lisk’s address below (or to any other address which Lisk may from time to time specify to the participant for this purpose) and shall be deemed delivered only when actually received by Lisk at:
        {'\n'}
          Lisk Foundation
        {'\n'}
          ℅ Sielva Management SA
        {'\n'}
          Gubelstrasse 11
        {'\n'}
          6300 Zug
        {'\n'}
          Switzerland
        {'\n'}
          Any communications sent to the participant (documents, notices, confirmations, statements etc.) are deemed received:
        {'\n'}
          a) If sent by email, within one hour after emailing it;
        {'\n'}
          b) If sent by Lisk’s online system, contact form, internal mail or support chat, immediately after sending it;
        {'\n'}
          </Small>
          <H4 style={styles.itemTitle}>19. COMPLAINTS AND DISPUTES</H4>
          <Small style={styles.itemDescription}>
        {'\n'}
          In the event that an alleged breach, controversy, claim, dispute or difference (a Dispute) arises between you and Lisk out of or in connection with these Terms and any other contractual documents (including but not limited to the validity, performance, breach or termination thereof), the parties shall seek to resolve the matter by negotiation by referring the matter first to:
        {'\n'}
          a) any member of your executive management in case of legal persons, or you personally if you are acting as a natural person;
        {'\n'}
          b) in the case of Lisk, to the Lisk Help Center.
        {'\n'}
          If you wish to report an error or a Dispute, you must send an email to Lisk’s Help Center, https://help.lisk.io, e-mail: help@lisk.io.
        {'\n'}
          The following information will need to be included:
        {'\n'}
          a) your name and surname;
        {'\n'}
          b) your e-mail address (or other recognition details);
        {'\n'}
          c) detailed enquiry description;
        {'\n'}
          e) the date and time that the issue arose.
        {'\n'}
          The Help Center shall:
        {'\n'}
          send an official response to you within 14 business days respectively;
          try to resolve the matter as soon as reasonably possible;
          inform you of the outcome.
          </Small>
          <H4 style={styles.itemTitle}>20. DISPUTE RESOLUTION, PLACE OF JURISDICTION AND GOVERNING LAW</H4>
          <Small style={styles.itemDescription}>
        {'\n'}
          These Terms and any other applicable contractual documents shall exclusively be governed by and construed in accordance with the substantive laws of Switzerland, excluding the conflict of laws principles thereof.
        {'\n'}
          Any dispute arising out of or in connection with these Terms shall be submitted to the exclusive jurisdiction of the competent courts of the city of Zug, Switzerland.
          </Small>
      </View>
    </View>
  </ScrollView>
);
/* eslint-enable */
export default withTheme(Terms, getStyles());
