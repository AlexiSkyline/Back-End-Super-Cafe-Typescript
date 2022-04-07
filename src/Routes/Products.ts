import { Router } from 'express';

const router = Router();

// ? Get all Products - Public
router.get( '/' );

// ? Get Product by ID - Public
router.get( '/:id' );

// ? Create Product - Private - Anyone with a valid token
router.post( '/' );

// ? Update Product - Private - Anyone with a valid token
router.put( '/:id' );

// ? Delete Product - Only with Administrator Permission
router.delete( '/:id' );

export default router;