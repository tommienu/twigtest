<?php
/**
 * Zend Framework (http://framework.zend.com/)
 *
 * @link      http://github.com/zendframework/ZendSkeletonApplication for the canonical source repository
 * @copyright Copyright (c) 2005-2013 Zend Technologies USA Inc. (http://www.zend.com)
 * @license   http://framework.zend.com/license/new-bsd New BSD License
 */

namespace Application\Controller;

use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\ViewModel;

class IndexController extends AbstractActionController
{
    public function indexAction()
    {

      $mt = new \MtHaml\Environment('twig', array('enable_escaper' => false));

      // load HAML files from templates/
      $fs = new \Twig_Loader_Filesystem(__DIR__ . '/../../../view/');
      $loader = new \MtHaml\Support\Twig\Loader($mt, $fs);

      // start twig
      $twig = new \Twig_Environment($loader, array(
          //'cache' => 'cache/',
      ));
      
      echo $twig->render("application/index/index.twig", array(
				'data' => array("test"=>"test2"),
				'twigdata' => 'works',
				'users' => array('patrik','tommie','prince')
      ));

      return false;
    }
}
