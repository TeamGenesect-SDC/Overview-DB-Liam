SELECT product_id, name, slogan, description, category, default_price,
(SELECT JSON_agg(name) as features FROM features WHERE product_id=20725)
  FROM products
    WHERE product_id=20725;
