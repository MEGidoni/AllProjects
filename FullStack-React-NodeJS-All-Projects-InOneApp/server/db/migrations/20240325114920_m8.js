/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.alterTable('products', function(table) {
        // Drop the 'isBought' column
        table.dropColumn('isBought');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.alterTable('products', function(table) {
        // Re-add the 'isBought' column if rolling back the migration
        table.boolean('isBought').defaultTo(false);
    });
};