import emailjs from '@emailjs/browser'

export function sendEmail(data: {
  from_name: string
  to_name: string
  code: string | number
  to_email: string
}) {
  const templateParams = {
    ...data
  }

  emailjs
    .send('service_ftjwr8i', 'template_1ivxq9d', templateParams, 'vILwuN5a8B39LwX9Y')
    .catch(() => {
      alert('Algo salió mal, por favor reintenta el registro.')
    })
}
