-- Active: 1706185248551@@127.0.0.1@3306@catchr
SELECT
    cards.card_id AS id,
    cards.card_name AS name,
    cards.card_image AS image,
    cards.card_number AS cardNumber,
    card_set.set_name AS setname,
    card_set.no_of_cards AS numCards
FROM cards
    lEFT JOIN card_set ON cards.set_id = card_set.set_id
ORDER BY cards.card_number