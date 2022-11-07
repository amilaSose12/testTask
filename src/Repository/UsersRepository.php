<?php

namespace App\Repository;

use App\Entity\Users;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Users>
 *
 * @method Users|null find($id, $lockMode = null, $lockVersion = null)
 * @method Users|null findOneBy(array $criteria, array $orderBy = null)
 * @method Users[]    findAll()
 * @method Users[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class UsersRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Users::class);
    }

    public function save(Users $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(Users $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function getAllUsersQuery()  {
        return $this->createQueryBuilder('u')
                ->getQuery();
    }

    
    public function getFilteredUsers($filterWord, $status)  {
        $query = $this->createQueryBuilder('u');

        if(!is_null($filterWord) && !empty($filterWord)) {
            $query->where('lower(u.first_name) LIKE lower(:filterWord)')
            ->orWhere('lower(u.last_name) LIKE lower(:filterWord)')
            ->orWhere('lower(u.username) LIKE lower(:filterWord)')
            ->orWhere('lower(u.email) LIKE lower(:filterWord)')
            ->setParameter('filterWord', '%' . $filterWord . '%');
        }
                
        if(!is_null($status)  && !empty($status)) {
            $query->andWhere('lower(u.status) = lower(:status)')
            ->setParameter('status', $status);
        }
  
        return $query->getQuery();
    }

    /**
     * @return Users[] Returns an array of Users objects
     */
    public function getFilteredUsersPerStatus($status) : array {
        return $this->createQueryBuilder('u')
                ->orWhere('lower(u.status) = lower(:status)')
                ->setParameter('status', $status)
                ->getQuery()
                ->getResult();
    }

//    /**
//     * @return Users[] Returns an array of Users objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('u')
//            ->andWhere('u.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('u.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?Users
//    {
//        return $this->createQueryBuilder('u')
//            ->andWhere('u.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
