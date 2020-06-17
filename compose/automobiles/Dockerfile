FROM php:7.4-fpm

# Install dependencies
RUN apt-get update \ 
    && apt-get install -y \
        # MongoDB package key deps
        \
        wget \
        software-properties-common \
        dirmngr \
        gnupg \
        \
    && wget -qO - https://www.mongodb.org/static/pgp/server-4.2.asc | apt-key add - \
    && echo "deb http://repo.mongodb.org/apt/debian buster/mongodb-org/4.2 main" | tee /etc/apt/sources.list.d/mongodb-org-4.2.list
    
RUN apt-get update \
    && apt-get install -y \
        # Build deps
        \
        build-essential \
        libpng-dev \
        libgmp-dev \
        libldap2-dev \
        libwebp-dev \
        libjpeg62-turbo-dev \
        libfreetype6-dev \
        libonig-dev \
        zlib1g-dev \
        libicu-dev \
        libzip-dev \
        libcurl4-openssl-dev \
        libssl-dev \
        # Other build deps
        \
        locales \
        zip \
        jpegoptim \
        optipng \
        pngquant \
        gifsicle \
        vim \
        git \
        curl \
        netcat \
        pkg-config \
        # Mongo deps
        \ 
        mongodb-org-shell=4.2.7 \
        mongodb-org-tools=4.2.7 

# Clear cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Install extensions
RUN docker-php-ext-install \
    \
    pdo_mysql \
    mbstring \
    zip \
    exif \
    pcntl
RUN docker-php-ext-configure gd
RUN docker-php-ext-install gd \
    && pecl install \ 
        mongodb \
        apcu \
        \
    && docker-php-ext-enable \
        mongodb \
        apcu \
        opcache

# Copy composer.lock and composer.json
# COPY composer.lock composer.json /var/www/
# Copy existing application directory contents
COPY . /var/www

# Set working directory
WORKDIR /var/www

# Install composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer \
    \
    && composer update \ 
    && composer install \
    && composer dump-autoload

# Add user for laravel application
RUN groupadd -g 1000 www
RUN useradd -u 1000 -ms /bin/bash -g www www

# Copy existing application directory permissions
COPY --chown=www:www . /var/www

# Change current user to www
RUN chown -R www-data:www-data /var/www
RUN php artisan key:generate
# Expose port 9000 and start php-fpm server
EXPOSE 9000
CMD ["php-fpm"]