/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.alterTable('products', function(table) {
        // Add the 'is_taken' column as a boolean type with a default value of false
        table.boolean('is_taken').defaultTo(false);
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.alterTable('products', function(table) {
        // Drop the 'is_taken' column if rolling back the migration
        table.dropColumn('is_taken');
      });
};
