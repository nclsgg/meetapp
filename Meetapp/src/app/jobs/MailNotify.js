import { format, parseISO } from 'date-fns';
import { enGB } from 'date-fns/locale/en-GB';
import Mail from '../../lib/Mail';

class MailNotify {
  get Key() {
    return 'MailNotify';
  }

  async handle({ data }) {
    const { meetup, user } = data;

    await Mail.sendMail({
      to: `${meetup.User.name} <${meetup.User.email}>`,
      subject: `New subscription to Meetup: [${meetup.title}]`,
      template: `mailtemplate`,
      context: {
        organizer: meetup.User.name,
        email: user.email,
        meetup: meetup.title,
        localization: meetup.localization,
        user: user.name,
        date: format(parseISO(meetup.date), "MMMM '' dd 'at' H:mm'h'", {
          locale: enGB,
        }),
      },
    });
  }
}

export default new MailNotify();
