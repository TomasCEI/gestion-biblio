import multer from 'multer'; // MiddleWare para subir archivos

// Configuración de multer para subir archivos
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
    
      //const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      //cb(null, file.fieldname + '-' + uniqueSuffix)
    
      // fecha + nombre
      //cb(null, Date.now() + '-' + file.originalname);

      // nombre original
      //cb(null, file.originalname);

      // user id + nombre
      const userId=req.params.id;
      cb(null, userId+"-"+file.originalname);
    }
  })


  //export const upload = multer({ storage: storage })

  // con limite de tamaño:

  const maxSize= 1024 * 1024 * 5; // 5MB
  //const maxSize= 124 * 124 * 1; // 1,5kb
  
  export const upload = multer({ 
    storage: storage,
    limits: { fileSize: maxSize }
 })