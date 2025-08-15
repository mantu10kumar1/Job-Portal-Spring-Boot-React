const formatDate = (dateString: string) =>{
    const date = new Date(dateString)
    const options = {year:'numeric' as const , month: 'short' as const};
    return date.toLocaleDateString('en-US', options)
}

function timeAgo(time:string) {
  // Ensure the input is a Date object
  const now = new Date();
  const postDate = new Date(time);
  const diff = now.getTime() - postDate.getTime();

  const seconds = Math.floor(diff / 1000);
  const minute = Math.floor(seconds / 60);
  const hour = Math.floor(minute / 60);
  const days = Math.floor(hour / 24);
  const month = Math.floor(days / 30);
  const year = Math.floor(month / 12);

  if(seconds < 60){
    return `${seconds} seconds ago`
  }
  else if(minute < 60){
    return `${minute} minutes ago`
  }
  else if(hour < 24){
    return `${hour} hours ago`
    }
  else if(days < 30){
    return `${days} days ago`
  }
  else if(month < 12){
    return `${month} months ago`
    }
  else{
    return `${year} years ago`
  }

}

const getBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      }
      fileReader.onerror = (error) => {
        reject(error);
      }
    })
  }

  const formatInterviewTime = (dateStr: any) => {
      const date = new Date(dateStr);
      return date.toLocaleString('en-US',{
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
      })
}

// How to show resume in new tab using blob I have base64 string write java script function for that
const openBase64PDF = (base64String: string) => {
    const byteCharacters = atob(base64String);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
   
  }



export {formatDate, timeAgo , getBase64 , formatInterviewTime , openBase64PDF};