<?php
declare(strict_types=1);

use Phinx\Migration\AbstractMigration;

final class FirstMigration extends AbstractMigration
{
/**
     * Migrate Up.
     */
    public function up()
    {
        $table = $this->table('permissions');

        // inserting multiple rows
        $rows = [
            [
              'id'    => 1,
              'code'  => 'R',
              'description' => 'Read'
            ],
            [
              'id'    => 2,
              'code'  => 'W',
              'description' => 'Write'
            ],
            [
              'id'    => 3,
              'code'  => 'RW',
              'description' => 'Read/Write'
            ]
        ];

        $table->insert($rows)->saveData();

        $table = $this->table('users');

        // inserting multiple rows
        $rows = [
            [
              'id'    => 1,
              'first_name'  => 'Amila',
              'last_name' => 'Sose',
              'username' => 'amila',
              'password' => 'test123',
              'email' => 'amila@gmail.com',
              'status' => 'active',
              'permissions' => 3
            ],
            [
                'id'    => 2,
                'first_name'  => 'Amila1',
                'last_name' => 'Sose1',
                'username' => 'amila1',
                'password' => 'test123',
                'email' => 'amila1@gmail.com',
                'status' => 'active',
                'permissions' => 2
            ],
            [
                'id'    => 3,
                'first_name'  => 'Amila2',
                'last_name' => 'Sose2',
                'username' => 'amila2',
                'password' => 'test123',
                'email' => 'amila2@gmail.com',
                'status' => 'active',
                'permissions' => 3
            ]
        ];

        $table->insert($rows)->saveData();
    }

    /**
     * Migrate Down.
     */
    public function down()
    {
        $this->execute('DELETE FROM users');
        $this->execute('DELETE FROM permissions');
    }
}
