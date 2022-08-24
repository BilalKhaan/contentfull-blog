export default {
  siteName() {
    let webUrl = process.env.URL; 
    let name =  process.env.CTF_HOST == "preview.contentful.com" ? 
     webUrl.slice(16)  : webUrl.slice(12) 
    return name.substring(0, name.length - 3);         
  }
};