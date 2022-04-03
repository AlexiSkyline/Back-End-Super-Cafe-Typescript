import { Router } from 'express';

const router = Router();

// ? Obtener todos los Productos - Public
router.get( '/' );

// ? Obtener un producto por el ID - Public
router.get( '/:id' );

// ? Crear Producto - Privado - Cualquiera con un token válido
router.post( '/' );

// ? Actualizar Producto - Privado - Cualquiera con un token válido
router.put( '/:id' );

// ? Borrar Producto - Solo con Permiso de Administrador
router.delete( '/:id' );

export default router;
