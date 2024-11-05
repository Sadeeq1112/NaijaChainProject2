import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Sticky from '@ui/sticky';
import Button from '@ui/button';
import GalleryTab from '@components/product-details/gallery-tab';
import ProductTitle from '@components/product-details/title';
import ProductCategory from '@components/product-details/category';
import ProductCollection from '@components/product-details/collection';
import { ImageType } from '@utils/types';
import { WalletContext } from '../../contexts/WalletContext';
import { createTransaction } from '../../utils/blockchain';

const ProductDetailsArea = ({
    space,
    className,
    product
}) => {
    const [transactionInProgress, setTransactionInProgress] = useState(false);
    const { isAuthenticated, walletAddress, connectWallet, disconnectWallet } = useContext(WalletContext);
    const [privateKey, setPrivateKey] = useState('');

    useEffect(() => {
        const fetchPrivateKey = async () => {
          try {
            const response = await fetch('/api/getPrivateKey', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ walletAddress }),
            });

            if (!response.ok) {
              throw new Error('Failed to fetch private key');
            }

            const { privateKey } = await response.json();
            setPrivateKey(privateKey);
          } catch (error) {
            console.error('Failed to fetch private key:', error);
          }
        };

        if (walletAddress) {
          fetchPrivateKey();
        }
      }, [walletAddress]);

    const handleBuy = async () => {
        try {
            setTransactionInProgress(true);
            // Simulate transaction processing for demonstration
            await new Promise(resolve => setTimeout(resolve, 2000));
            await createTransaction(product, walletAddress, privateKey);
            alert('Purchase successful!');
        } catch (error) {
            console.error('Failed to complete purchase:', error);
            alert('Failed to complete purchase');
        } finally {
            setTransactionInProgress(false);
        }
    };

    return (
        <div
            className={clsx(
                'product-details-area',
                space === 1 && 'rn-section-gapTop',
                className
            )}
        >
            <div className="container">
                <div className="row g-5">
                    <div className="col-lg-7 col-md-12 col-sm-12">
                        <Sticky>
                            <GalleryTab images={product.images} />
                        </Sticky>
                    </div>
                    <div className="col-lg-5 col-md-12 col-sm-12 mt_md--50 mt_sm--60">
                        <div className="rn-pd-content-area">
                            <ProductTitle
                                title={product.title}
                                likeCount={product.likeCount}
                            />
                            <span className="bid">
                                Price{' '}
                                <span className="price">
                                    {product.price.amount}
                                    {product.price.currency}
                                </span>
                            </span>
                            <h6 className="title-name"> {walletAddress} </h6>
                            <div className="catagory-collection">
                                <ProductCategory owner={product.owner} />
                                <ProductCollection
                                    collection={product.collection}
                                />
                            </div>
                            <Button
                                color="primary-alta"
                                onClick={handleBuy}
                                disabled={transactionInProgress}
                            >
                                {transactionInProgress
                                    ? 'Processing...'
                                    : 'Buy Now'}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

ProductDetailsArea.propTypes = {
    space: PropTypes.oneOf([1, 2]),
    className: PropTypes.string,
    product: PropTypes.shape({
        title: PropTypes.string.isRequired,
        likeCount: PropTypes.number,
        price: PropTypes.shape({
            amount: PropTypes.number.isRequired,
            currency: PropTypes.string.isRequired,
        }).isRequired,
        owner: PropTypes.shape({}),
        collection: PropTypes.shape({}),
        images: PropTypes.arrayOf(ImageType),
    }),
};

ProductDetailsArea.defaultProps = {
    space: 1,
};

export default ProductDetailsArea;
