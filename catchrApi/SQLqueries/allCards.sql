    -- all fields require for a card
    SELECT 
    cards.card_id AS id,
    card_category.category_name AS category,
    card_category.category_id AS categoryID,
    cards.card_name AS name,
    cards.card_image AS image,
    cards.hp AS hp,
    cards.height_weight,
    cards2.card_name AS evolvesFrom,
    cards2.card_image AS evolvesFromImg,
    card_Type3.type_image_url AS cardType, 
    abilities1.ability_name AS ability1Name,
    abilities1.ability_description AS ability1Descr, 
    abilities1.ability_damage AS ability1Dmg,
    card_type1.type_image_url AS ability1Type,
    abilities2.ability_name AS ability2Name,
    abilities2.ability_description AS ability2Descr,
    abilities2.ability_damage AS ability2Dmg,
    card_Type2.type_image_url AS ability2Type,
    card_Type4.type_image_url AS weaknessType,
    card_Type5.type_image_url AS resistanceType,
    card_Type6.type_image_url AS retreatType,
    cards.card_description AS descr,
    illustrators.illustrator_name AS illustrator,
    fine_print.fine_print_description AS fineprint,
    rarity.rarity_description AS rarity,
    cards.card_number AS cardNumber,
    card_set.set_name AS setname,
    card_set.no_of_cards AS numCards,
    background_image.bg_image_url AS backgroundImg
    
    FROM cards 
    
    LEFT JOIN cards AS cards2 ON cards.evolves_from_id = cards2.card_id
    
    -- Adds a type of card; energy, trainer, basic, stage 1 or stage 2
    LEFT JOIN card_category ON cards.card_category_id = card_category.category_id
    
    -- getting the first ability details 
    LEFT JOIN abilities AS abilities1 ON cards.ability1_id = abilities1.ability_id
    
    -- getting the second ability details - requires alias for abilities table
    LEFT JOIN abilities AS abilities2 ON cards.ability2_id = abilities2.ability_id
    
    -- Getting the first abilities type
    LEFT JOIN card_type AS card_type1 ON abilities1.ability_type_1_id = card_type1.type_id
    
    -- Getting the second abilities type
    LEFT JOIN card_type AS card_Type2 ON abilities2.ability_type_1_id = card_Type2.type_id
    
    -- Getting the overall card type
    LEFT JOIN card_type AS card_Type3 ON cards.type_id = card_Type3.type_id
    
    -- Getting weakness
    LEFT JOIN card_type AS card_Type4 on cards.weakness_type_id = card_Type4.type_id
    
    -- Getting resistance
    LEFT JOIN card_type AS card_Type5 on cards.resistance_type_id = card_Type5.type_id
    
    -- Getting retreat cost
    LEFT JOIN card_type AS card_Type6 on cards.retreat_type_id = card_Type6.type_id
    
    -- Getting illustrator
    LEFT JOIN illustrators on cards.illustrator_id = illustrators.illustrator_id
     
    -- getting fine print
    LEFT JOIN fine_print on cards.fine_print_id = fine_print.fine_print_id
    
    -- ADDgetting rarity
    LEFT JOIN rarity ON cards.rarity_id = rarity.rarity_id
    
    -- getting set
    LEFT JOIN card_set ON cards.set_id = card_set.set_id

    LEFT JOIN background_image ON cards.background_image_id = background_image.image_id

    