<?php
header('Content-Type: text/plain');
echo "=== Building ptlinearproperty.com ===\n";
$cmd = 'cd /home/ptlinear/chic-property && export NODE_PATH=/home/ptlinear/nodevenv/chic-property/22/lib/node_modules && export PATH=/home/ptlinear/nodevenv/chic-property/22/bin:$PATH && npm run build 2>&1 && pkill -f "node dist/passenger" 2>/dev/null; sleep 1; nohup node dist/passenger.cjs > /tmp/node_ptlinear.log 2>&1 &';
echo shell_exec($cmd);
echo "\n=== DONE ===";
?>

