import { it, expect, describe, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import { Product } from './Product';

vi.mock('axios');

describe('Product component', () => {
    const product = {
            id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
            image: "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
            name: "Adults Plain Cotton T-Shirt - 2 Pack",
            rating: {
                stars: 4.5,
                count: 56
            },
            priceCents: 799,
            keywords: ["tshirts", "apparel", "mens"]
        }

        const loadCart = vi.fn();
    it('displays the product details correctly', () => {

        render(<Product product={product} loadCart={loadCart} />);

        expect(
            screen.getByText('Adults Plain Cotton T-Shirt - 2 Pack')
        ).toBeInTheDocument();

        expect(
            screen.getByText('$7.99')
        ).toBeInTheDocument();

        expect(
            screen.getByTestId('product-image')
        ).toHaveAttribute('src', 'images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg')

        expect(
            screen.getByTestId('product-rating-stars-image')
        ).toHaveAttribute('src', 'images/ratings/rating-45.png')

        expect(
            screen.getByText('56')
        ).toBeInTheDocument();
    })

    it('adds a product to the cart', async () => {

        render(<Product product={product} loadCart={loadCart} />);

        const user = userEvent.setup();
        const addToCartButton = screen.getByTestId('add-to-cart-button');
        await user.click(addToCartButton);

        expect(axios.post).toHaveBeenCalledWith(
            '/api/cart-items',
            {
                productId: '83d4ca15-0f35-48f5-b7a3-1ea210004f2e',
                quantity: 1
            }
        )

        expect(loadCart).toHaveBeenCalled();
    })
})